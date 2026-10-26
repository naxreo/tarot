#!/usr/bin/env bash
# 타로 앱을 DKOS infra-ocell-dev-v2 클러스터에 빌드·푸시·배포하는 원샷 스크립트
# 사용법.
#   ./deploy.sh                 # 빌드 + push + apply + rollout
#   ./deploy.sh --skip-build    # apply + rollout만 (매니페스트만 바뀌었을 때)
#   ./deploy.sh --apply-only    # apply만 (rollout restart 없이)

set -euo pipefail

# ── 설정 ──────────────────────────────────────────────────────────────
IMAGE="${IMAGE:-nexus.onkakao.net/kakao-plat-docker-hosted/tarot:latest}"
CONTEXT="${CONTEXT:-infra-ocell-dev-v2-context}"
NAMESPACE="${NAMESPACE:-tarot}"
DEPLOYMENT="${DEPLOYMENT:-tarot}"
PLATFORM="${PLATFORM:-linux/amd64}"

ROOT="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="${ROOT}/app"
K8S_DIR="${ROOT}/k8s"

# ── 옵션 파싱 ─────────────────────────────────────────────────────────
SKIP_BUILD=0
APPLY_ONLY=0
for arg in "$@"; do
  case "$arg" in
    --skip-build) SKIP_BUILD=1 ;;
    --apply-only) APPLY_ONLY=1 ;;
    -h|--help)
      sed -n '2,7p' "$0"; exit 0 ;;
    *) echo "알 수 없는 옵션: $arg" >&2; exit 2 ;;
  esac
done

step() { printf '\n\033[1;36m▸ %s\033[0m\n' "$*"; }

# ── 0. 컨텍스트 확인 ──────────────────────────────────────────────────
step "kubectl 컨텍스트 확인"
current="$(kubectl config current-context)"
if [[ "$current" != "$CONTEXT" ]]; then
  echo "현재 컨텍스트가 '$current' 입니다. '$CONTEXT' 로 전환할까요? [y/N]"
  read -r ans
  [[ "$ans" == "y" || "$ans" == "Y" ]] || { echo "중단"; exit 1; }
  kubectl config use-context "$CONTEXT"
fi
echo "  context: $(kubectl config current-context)"

# ── 1. 빌드 + push ────────────────────────────────────────────────────
if [[ $SKIP_BUILD -eq 0 ]]; then
  step "이미지 빌드 ($PLATFORM)  →  $IMAGE"
  docker build --platform "$PLATFORM" --provenance=false --sbom=false -t "$IMAGE" "$APP_DIR"

  step "이미지 push"
  docker push "$IMAGE"
else
  echo "  [skip-build] 빌드/푸시 건너뜀"
fi

# ── 2. 매니페스트 적용 ────────────────────────────────────────────────
step "매니페스트 적용"
kubectl apply -f "$K8S_DIR/manifest.yaml"

# ── 3. rollout ────────────────────────────────────────────────────────
if [[ $APPLY_ONLY -eq 0 ]]; then
  # latest 태그를 재사용하므로 매니페스트 spec이 안 바뀌면 새 이미지를 끌어오지 않음 → restart 강제
  step "rollout restart"
  kubectl -n "$NAMESPACE" rollout restart "deploy/$DEPLOYMENT"

  step "rollout 대기"
  kubectl -n "$NAMESPACE" rollout status "deploy/$DEPLOYMENT" --timeout=3m
fi

# ── 4. 결과 요약 ──────────────────────────────────────────────────────
step "배포 결과"
kubectl -n "$NAMESPACE" get deploy,po,svc,ingress -l app.kubernetes.io/name=tarot

cat <<EOF

✓ 배포 완료
  도메인  https://oo.dev.onkakao.net/
  확인    curl -I https://oo.dev.onkakao.net/
  로그    kubectl -n $NAMESPACE logs -f deploy/$DEPLOYMENT
EOF
