# DKOS 배포 가이드 — tarot

타로 Next.js 앱을 DKOS `infra-ocell-dev-v2` 클러스터에 kingress 로 노출.

| 항목 | 값 |
|---|---|
| 도메인 | `oo.dev.onkakao.net` (`*.dev.onkakao.net` 와일드카드 인증서 자동 부착) |
| Cluster context | `infra-ocell-dev-v2-context` |
| Region | `ay2dev` (worker 6대 모두 `openstack-vm` / krane) |
| Namespace | `tarot` (매니페스트가 자동 생성) |
| IngressClass | `kakao` (kingress) |
| 이미지 | `nexus.onkakao.net/kakao-plat-docker-hosted/tarot:latest` (linux/amd64) |

## 배포 흐름

### 1) 컨텍스트 확인

```bash
kubectl config use-context infra-ocell-dev-v2-context
kubectl config current-context
```

### 1-1) nexus pull secret (최초 1회)

nexus 는 익명 pull 이 안 되므로 `tarot` 네임스페이스에 `nexus-onkakao-net` Secret 이 있어야 합니다. 매니페스트를 먼저 apply 해서 네임스페이스를 만든 뒤 생성합니다.

```bash
CREDS=$(curl -sS https://keystore.dev.onkakao.net/user/key/TvLtNySdfekMsapA -H 'accept: application/json')
kubectl -n tarot create secret docker-registry nexus-onkakao-net \
  --docker-server=https://nexus.onkakao.net \
  --docker-username="$(echo "$CREDS" | jq -r .value.user)" \
  --docker-password="$(echo "$CREDS" | jq -r .value.passwd)"
```

같은 내용을 `--dry-run=client -o yaml` 로 뽑아 둔 `k8s/nexus-secret.yaml` 이 있으면 `kubectl apply -f k8s/nexus-secret.yaml` 로 대신합니다. 자격증명이 들어 있어 `.gitignore` 로 제외합니다.

### 2) 이미지 빌드 & push

타로 앱 디렉터리(`app/`) 에서. `--platform linux/amd64` 필수 (Apple Silicon 빌드 호환). 베이스 이미지도 nexus `docker-proxy-group` 경유라 `docker login nexus.onkakao.net` 이 되어 있어야 합니다. `--provenance=false --sbom=false` 는 nexus 에 `Unknown/Unknown` 아키텍처가 함께 올라가는 것을 막습니다.

```bash
cd app

IMAGE=nexus.onkakao.net/kakao-plat-docker-hosted/tarot:latest

docker build --platform linux/amd64 --provenance=false --sbom=false -t "$IMAGE" .
docker push "$IMAGE"

# 검증 — Platform: linux/amd64 가 보여야 함
docker buildx imagetools inspect "$IMAGE" | grep -i platform
```

### 3) 매니페스트 적용

```bash
cd k8s

# dry-run 먼저
kubectl apply --dry-run=server -f manifest.yaml

# 실제 적용
kubectl apply -f manifest.yaml
```

### 4) 배포 확인

```bash
kubectl -n tarot get deploy,po,svc,ingress -l app.kubernetes.io/name=tarot
kubectl -n tarot rollout status deploy/tarot
kubectl -n tarot describe ingress tarot

# DNS 가 잡히면
curl -I https://oo.dev.onkakao.net/
```

### 5) 재배포 (이미지 갱신 시)

`latest` 태그 + `imagePullPolicy: Always` 라 같은 태그로 다시 push 하고 rollout restart 하면 새 이미지를 끌어옵니다.

```bash
cd app
docker build --platform linux/amd64 --provenance=false --sbom=false -t nexus.onkakao.net/kakao-plat-docker-hosted/tarot:latest .
docker push nexus.onkakao.net/kakao-plat-docker-hosted/tarot:latest

kubectl -n tarot rollout restart deploy/tarot
kubectl -n tarot rollout status deploy/tarot
```

## 사전 점검 결과 — infra-ocell-dev-v2 (2026-06 시점 스냅샷)

| 항목 | 결과 |
|---|---|
| K8s 서버 버전 | v1.26.4 (`networking.k8s.io/v1`, `apps/v1` GA 사용) |
| Worker | 6대 모두 `ay2dev` / `openstack-vm` (krane) |
| Ingress 노드 | 1대 (`lb=true`, `ay2dev`, krane) |
| Master | 3대 (region 라벨 없음, single-region) |
| kingress controller | `kube-system/kakao-ingress-controller-manager` 2/2 Ready |
| IngressClass `kakao` | 미등록 — kingress 는 문자열 매칭만으로 동작 |
| `oo.dev.onkakao.net` 호스트 충돌 | 없음 |
| Namespace `tarot` | 매니페스트가 함께 생성 |
| server-side dry-run | Deployment/Service/Ingress 통과 (Kyverno OK) |

## 매니페스트가 따른 DKOS 규칙

| 규칙 | 위치 |
| --- | --- |
| `ingressClassName: kakao` | `Ingress.spec` |
| Ingress + Service 동일한 `topology.kubernetes.io/region: ay2dev` | kingress LB region 결정 / pool 등록 |
| TLS `secretName` 미지정 (와일드카드 자동 부착) | `Ingress.spec.tls` |
| Pod nodeAffinity 가 `worker` 노드 + `ay2dev` 한정 | ingress/master 노드 회피 + region 일관성 |
| 외부 노출은 `Service.type: NodePort` (ClusterIP 단독 금지) | `Service.spec.type` |
| GA API 만 사용 (`apps/v1`, `networking.k8s.io/v1`) | K8s 1.26.4 호환 |
| 표준 라벨 `app.kubernetes.io/{name,instance,part-of,version,managed-by}` | Kyverno user-apps 정책 충돌 방지 |
| 이미지는 사내 nexus + linux/amd64 | DKOS 스킬 §15 |

상태성 자원(PVC/CNPG 등) 추가 시 SC region 도 `ay2dev` 로 묶고 nodeAffinity 에 `dkosv3.9rum.cc/node-backend: openstack-vm` 추가 필요 (Cinder CSI 는 PM attach 불가).
