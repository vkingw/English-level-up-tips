<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, watch } from "vue";
import { useRoute } from "vitepress";

const route = useRoute();
let observer: MutationObserver | undefined;
let animationFrame: number | undefined;

function setText(selector: string, value: string) {
  const element = document.querySelector<HTMLElement>(selector);
  if (element && element.textContent?.trim() !== value) element.textContent = value;
}

function setLabels(selector: string, value: string) {
  for (const element of document.querySelectorAll<HTMLElement>(selector)) {
    if (element.getAttribute("aria-label") !== value) element.setAttribute("aria-label", value);
  }
}

function headingText(anchor: HTMLElement) {
  const heading = anchor.closest<HTMLElement>("h1, h2, h3, h4, h5, h6");
  if (!heading) return "";
  const copy = heading.cloneNode(true) as HTMLElement;
  copy.querySelector(".header-anchor")?.remove();
  return copy.textContent?.trim() || "";
}

function localizeLabels() {
  animationFrame = undefined;
  const isEnglish = document.documentElement.lang.startsWith("en");

  setText("#main-nav-aria-label", isEnglish ? "Main Navigation" : "主导航");
  setText("#sidebar-aria-label", isEnglish ? "Sidebar Navigation" : "侧栏导航");
  setText("#doc-footer-aria-label", isEnglish ? "Pager" : "章节导航");
  setLabels(".VPNavBarHamburger", isEnglish ? "Mobile navigation" : "移动端导航");
  setLabels(".VPSidebarItem .caret", isEnglish ? "Toggle section" : "展开或收起分组");
  setLabels(".VPNavBarExtra .button", isEnglish ? "Extra navigation" : "更多导航");

  for (const anchor of document.querySelectorAll<HTMLElement>(".header-anchor")) {
    const text = headingText(anchor);
    if (!text) continue;
    const label = isEnglish ? `Permalink to "${text}"` : `“${text}”的固定链接`;
    if (anchor.getAttribute("aria-label") !== label) anchor.setAttribute("aria-label", label);
  }
}

function scheduleLocalization() {
  if (animationFrame === undefined) animationFrame = window.requestAnimationFrame(localizeLabels);
}

onMounted(() => {
  observer = new MutationObserver(scheduleLocalization);
  observer.observe(document.body, { childList: true, subtree: true });
  scheduleLocalization();
});

watch(
  () => route.path,
  async () => {
    await nextTick();
    scheduleLocalization();
  },
);

onBeforeUnmount(() => {
  observer?.disconnect();
  if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame);
});
</script>

<template></template>
