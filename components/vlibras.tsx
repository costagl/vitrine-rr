"use client";

import React, { EffectCallback, useEffect, useCallback } from "react";

type ExpectedReadyState =
  | ReadonlyArray<DocumentReadyState>
  | DocumentReadyState
  | undefined;

const isReadyStateMatch = (expected?: ExpectedReadyState): boolean => {
  if (!expected) {
    return true;
  }
  if (typeof expected === "string" && document.readyState === expected) {
    return true;
  }
  return expected.indexOf(document.readyState) !== -1;
};

type useReadyStateEffect = (
  effect: EffectCallback,
  deps?: any[],
  onState?: ExpectedReadyState
) => void;

const useReadyStateEffect: useReadyStateEffect = (
  effect,
  deps = [],
  onState = "complete"
): void => {
  useEffect(() => {
    const listener = () => {
      if (!isReadyStateMatch(onState)) {
        return;
      }
      const destructor = effect();
      if (destructor) {
        destructors.push(destructor);
      }
    };

    const destructors: Array<() => void> = [
      () => document.removeEventListener("readystatechange", listener),
    ];

    listener(); // Run once immediately
    document.addEventListener("readystatechange", listener);

    return () => destructors.forEach((d) => d());
  }, [effect, onState, ...deps]); // Removido o spread de deps e usado explicitamente
};

type Props = {
  forceOnload?: boolean;
};

function VLibras({ forceOnload }: Props): React.ReactNode {
  // Utilizando useCallback para evitar reexecução desnecessária do efeito
  const loadScript = useCallback(() => {
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    const widgetUrl = `https://vlibras.gov.br/app`;
    script.onload = () => {
      // @ts-ignore
      new window.VLibras.Widget(widgetUrl);
      if (forceOnload) {
        // @ts-ignore
        window.onload();
      }
    };
    document.head.appendChild(script);
  }, [forceOnload]);

  // Passando dependências explicitamente para evitar o spread
  useReadyStateEffect(loadScript, [forceOnload], "complete");

  return (
    // @ts-ignore
    <div vw="true" className="enabled">
      <div vw-access-button="true" className="active" />
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}

export default VLibras;
