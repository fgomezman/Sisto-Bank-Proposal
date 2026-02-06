document.addEventListener("DOMContentLoaded", function () {
  if (window.mermaid) {
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      flowchart: {
        useMaxWidth: true
      }
    });
  }
});
