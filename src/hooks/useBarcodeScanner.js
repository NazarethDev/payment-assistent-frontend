import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";

export function useBarcodeScanner({ videoRef, enabled, onDetected }) {

    const hints = new Map();

    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
        BarcodeFormat.CODE_128,
        BarcodeFormat.ITF
    ]);

    const readerRef = useRef(
        new BrowserMultiFormatReader(hints)
    );

    const controlsRef = useRef(null);
    const onDetectedRef = useRef(onDetected);
    onDetectedRef.current = onDetected;

    useEffect(() => {

        let isMounted = true;

        const startScanning = async () => {

            if (!enabled || !videoRef.current) return;

            const controls = await readerRef.current.decodeFromVideoDevice(
                undefined,
                videoRef.current,
                (result) => {

                    if (result && isMounted) {
                        const text = result.getText();
                        if (text.length >= 44) {
                            onDetectedRef.current(text);
                        }
                    }

                }
            );

            controlsRef.current = controls;

        };

        if (enabled) startScanning();

        return () => {

            isMounted = false;

            if (controlsRef.current) {
                controlsRef.current.stop();
            }

        };

    }, [enabled, videoRef]);
}