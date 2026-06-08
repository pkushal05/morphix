const PreviewPanel = ({ sectionsHtml }: { sectionsHtml: string }) => {
    return <div dangerouslySetInnerHTML={{ __html: sectionsHtml }} />;
};

export default PreviewPanel;
