<template>
  <div class="skeleton" aria-hidden="true"></div>
</template>

<style>
.skeleton {
  width: 100%;
  height: 1rem;
  position: relative;
  overflow: hidden;
  background-color: #e9ecef;
  border-radius: 0.25rem;
}

@media (prefers-color-scheme: dark) {
  .skeleton {
    background-color: rgba(255, 255, 255, 0.06);
  }
}

.skeleton::after {
  content: '';
  animation: skeleton-animation 1.2s infinite;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(-100%);
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0)
  );
}

@keyframes skeleton-animation {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
