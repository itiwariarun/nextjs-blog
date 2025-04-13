const HtmlRenderer = ({ htmlContent }: { htmlContent: string }) => {
  return (
    <span
      className="html-renderer"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default HtmlRenderer;
