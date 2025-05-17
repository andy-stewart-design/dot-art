import { createSignal, onMount } from "solid-js";
import GlslRenderer from "shdr";
import frag from "@/assets/home-bg.frag?raw";
import s from "./style.module.css";

export default function HomeCanvas() {
  let container!: HTMLDivElement;
  const [gl, setGl] = createSignal<GlslRenderer | null>(null);
  const [paused, setPaused] = createSignal(true);

  onMount(() => {
    const gl = new GlslRenderer({ container, frag });
    const isReduced = window.matchMedia("(prefers-reduced-motion)").matches;
    gl.play(!isReduced);
    setGl(gl);
    setPaused(isReduced);
  });

  function togglePlay() {
    if (gl()?.paused) {
      gl()?.play();
      setPaused(false);
    } else {
      gl()?.pause();
      setPaused(true);
    }
  }

  return (
    <div ref={container} class={s.container}>
      <button class={s.play} onclick={togglePlay}>
        {paused() ? "Play" : "Pause"}
      </button>
    </div>
  );
}
