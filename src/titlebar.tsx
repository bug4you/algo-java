import { getCurrentWindow } from '@tauri-apps/api/window';
import {useEffect} from "react";

const Titlebar = () => {

    useEffect(() => {
        const appWindow = getCurrentWindow();

        const btnMin = document.getElementById("titlebar-minimize");
        const btnMax = document.getElementById("titlebar-maximize");
        const btnClose = document.getElementById("titlebar-close");
        const bar = document.getElementById("titlebar");

        if (btnMin) btnMin.addEventListener("click", () => appWindow.minimize());
        if (btnMax) btnMax.addEventListener("click", () => appWindow.toggleMaximize());
        if (btnClose) btnClose.addEventListener("click", () => appWindow.close());

        // Double-click to maximize / drag support
        if (bar) {
            bar.addEventListener("mousedown", (e) => {
                if (e.buttons === 1) {
                    e.detail === 2
                        ? appWindow.toggleMaximize()
                        : appWindow.startDragging();
                }
            });
        }

        // Cleanup: remove listeners when component unmounts
        return () => {
            if (btnMin) btnMin.replaceWith(btnMin.cloneNode(true));
            if (btnMax) btnMax.replaceWith(btnMax.cloneNode(true));
            if (btnClose) btnClose.replaceWith(btnClose.cloneNode(true));
            if (bar) bar.replaceWith(bar.cloneNode(true));
        };
    }, []);

    return (
        <div className="titlebar">
            <div className="titlebar-bg" data-tauri-drag-region></div>

            <div className="controls" role="toolbar" aria-label="Window Controls">
                <button id="titlebar-close" className="ctrl ctrl-close" title="Close" aria-label="Close">
                    <svg viewBox="0 0 9 9" aria-hidden="true">
                        <path d="M1 1 L8 8 M8 1 L1 8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                    </svg>
                </button>
                <button id="titlebar-minimize" className="ctrl ctrl-min" title="Minimize" aria-label="Minimize">
                    <svg viewBox="0 0 9 9" aria-hidden="true">
                        <path d="M1.5 4.5 H7.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                    </svg>
                </button>
                <button id="titlebar-maximize" className="ctrl ctrl-max" title="Zoom" aria-label="Zoom">
                    <svg viewBox="0 0 9 9" aria-hidden="true">
                        <path d="M4.5 1.5 V7.5 M1.5 4.5 H7.5" stroke="currentColor" stroke-width="1.2"
                              stroke-linecap="round"/>
                    </svg>
                </button>
            </div>

            <div className="title google-sans-code text-white" data-tauri-drag-region>AlgoJava</div>
        </div>
    );
};

export default Titlebar;