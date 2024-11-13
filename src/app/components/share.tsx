"use client";
import { Button } from "@/app/components/ui/button";

export const Share = () => {
  const copyURLHandler = async () => {
    const currentUrl = window.location.href;

    const type = "text/plain";
    const blob = new Blob([currentUrl], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    await navigator.clipboard.write(data);
  };

  return (
    <div className="my-8 flex justify-center">
      <Button onClick={copyURLHandler} loading={false}>
        Share Link
      </Button>
    </div>
  );
};
