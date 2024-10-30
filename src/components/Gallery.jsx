import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Input,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./Gallery.module.css";

const Gallery = ({
  galleryUrls,
  newImages,
  deletedUrls, // 参照用
  editMode,
  updateEditData,
  keyName,
}) => {
  const [open, setOpen] = useState(false);
  const [newImageUrls, setNewImageUrls] = useState([]);
  const fileInputRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    updateEditData(files, true);
  };

  const handleFileDelete = (index, isNewFiles = false) => {
    updateEditData(index, isNewFiles, true);
  };

  useEffect(() => {
    // 新しい画像のオブジェクトURLを作成
    const urls = newImages.map((file) => URL.createObjectURL(file));
    setNewImageUrls(urls);

    // クリーンアップ関数：コンポーネントのアンマウント時や新しい画像が変更されたときにオブジェクトURLを解放
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newImages]);

  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box>
      <Box className={styles.galleryContainer} onClick={handleClickOpen}>
        {galleryUrls[keyName].slice(0, 2).map((url, index) => (
          <img
            key={`gallery-${index}`}
            src={url}
            alt={`ギャラリー ${index}`}
            className={styles.galleryImage}
          />
        ))}
        {editMode && (
          <label
            htmlFor="file-upload"
            className={styles.editPlaceholder}
            onClick={handleAddImageClick}
          >
            <Typography variant="h6">画像を追加</Typography>
          </label>
        )}
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          ギャラリー
          <IconButton
            aria-label="閉じる"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box className={styles.fullGalleryContainer}>
            {galleryUrls[keyName].map((url, index) => (
              <div
                className={styles.fullGalleryImageContainer}
                key={`gallery-full-${index}`}
              >
                <img
                  src={url}
                  alt={`ギャラリー ${index}`}
                  className={styles.fullGalleryImage}
                />
                {editMode && (
                  <IconButton
                    aria-label="削除"
                    onClick={() => handleFileDelete(index)}
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      color: "red",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
            ))}
            {newImageUrls.map((url, index) => (
              <div
                className={styles.fullGalleryImageContainer}
                key={`new-${index}`}
              >
                <img
                  src={url}
                  alt={`新しいギャラリー ${index}`}
                  className={styles.fullGalleryImage}
                />
                {editMode && (
                  <IconButton
                    aria-label="削除"
                    onClick={() => handleFileDelete(index, true)}
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      color: "red",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
            ))}
            {editMode && (
              <label
                htmlFor="file-upload"
                className={styles.editPlaceholder}
                onClick={handleAddImageClick}
              >
                <Typography variant="h6">画像を追加</Typography>
              </label>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Input
        id="file-upload"
        type="file"
        inputProps={{ multiple: true, accept: "image/*" }}
        style={{ display: "none" }} // ファイル入力を非表示
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default Gallery;
