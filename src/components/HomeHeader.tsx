import { Component, createEffect, createSignal } from 'solid-js';

import logo from '../assets/logo.svg';
import wordmark from '../assets/wordmark.svg';
import { LumeHeaderBackground } from './LumeHeaderBackground';

const MainHeaderContent: Component<{ offsetX: number; offsetY: number }> = (props) => (
  <section
    class="px-3 lg:px-12 container space-y-10 lg:pb-20 lg:pt-52 py-10"
    style={`
      transform: translate3d(${props.offsetX}px, ${props.offsetY}px, 0);
    `}
  >
    <div class="flex flex-col justify-center lg:justify-start lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
      <img class="w-28  lg:w-48" src={logo} alt="Solid logo" />
      <img class="w-32  lg:w-52" src={wordmark} alt="Solid wordmark" />
    </div>
    <h2 class="font-semibold text-3xl text-center lg:text-left lg:text-4xl leading-loose">
      A declarative, efficient, and flexible JavaScript library for building user interfaces.
    </h2>
  </section>
);

const HomeHeader: Component = () => {
  const [mouseX, setMouseX] = createSignal(0);
  const [mouseY, setMouseY] = createSignal(0);
  const [header, setHeader] = createSignal<HTMLElement | undefined>();
  const [headerSize, setHeaderSize] = createSignal<HeaderSize>({ x: 0, y: 0 });

  createEffect(() => {
    if (!header()) return;

    const rect = header().getBoundingClientRect();
    setHeaderSize({ x: rect.width, y: rect.height });

    const observer = new ResizeObserver((changes) => {
      for (const change of changes) {
        setHeaderSize({
          x: change.contentBoxSize[0].inlineSize,
          y: change.contentBoxSize[0].blockSize,
        });
      }
    });

    observer.observe(header());

    return () => observer.disconnect();
  });

  return (
    <header
      ref={setHeader}
      style="position: relative; overflow: hidden"
      class="mx-3 rounded-br-3xl rounded-bl-3xl bg-gradient-to-r from-solid-light via-solid-medium to-solid-default text-white"
      onpointermove={(event) => {
        setMouseX(event.clientX);
        setMouseY(event.clientY);
      }}
    >
      {/* Place the LUME scene below the main header content. */}
      <div style="position: absolute; width: 100%; height: 100%; z-index: 1;">
        <LumeHeaderBackground mouseX={mouseX()} mouseY={mouseY()} />
      </div>

      {/* Place the main header content on top of the LUME scene. */}
      <div style="position: absolute; width: 100%; height: 100%; z-index: 2">
        <MainHeaderContent
          // To move the header...
          // TODO consolidate with duplicate math in LumeHeaderBackground
          offsetX={(mouseX() - headerSize().x / 2) / 20}
          offsetY={(mouseY() - headerSize().y / 2) / 20}

          // ... or not to move the header?
          // offsetX={0}
          // offsetY={0}
        />
      </div>

      {/* Hack: This is a duplicate of the main content so that it gives the
        header its natural size (otherwise the position:absolute of the first one
        causes the header to ignore it for its sizing calculations). */}
      <div style="visibility: hidden;">
        <MainHeaderContent offsetX={0} offsetY={0} />
      </div>
    </header>
  );
};

export default HomeHeader;

type HeaderSize = { x: number; y: number };