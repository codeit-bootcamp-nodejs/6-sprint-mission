

export function UploadSingleImage(req, res) {
    console.log(req.file);
    const { filename } = req.file;
    const path = `files/${filename}`;
    res.json({ path });
}