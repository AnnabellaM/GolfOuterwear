import Box from "@mui/material/Box";
import * as React from "react";
import classes from "../layout/ImageUploader.module.css";
import {useEffect, useState} from "react";
import {agent} from "../../agent";

export default (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const inputFileRef = React.useRef();

  useEffect(() => {
    setImageUrl(props.imageUrl || '');
  }, []);

  // trigger input element
  const chooseImage = () => {
    inputFileRef.current.click();
  }

  // upload the image
  const uploadImage = async (e) => {
    const [file] = e.target.files;
    if (!file) return;

    setIsLoading(true);

    agent.uploadImage(file)
      .then((res) => {
        switch (res.status) {
          case 200:
            const imageUrl = agent.formatImageUrl(res.body.url)
            setImageUrl(imageUrl);

            // callback if function existed
            if (!!props.afterImageUploaded) {
              props.afterImageUploaded(imageUrl);
            }
            return;
          case 400:
            alert(res.body.message);
            return;
        }
        alert('Unexpected error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return (
      <Box className={classes['image-uploader']}>
        <div onClick={chooseImage} className={classes['image-uploader__frame']}>
          loading...
        </div>
        <input type='file' ref={inputFileRef} onChange={uploadImage}/>
      </Box>
    );
  }

  if (!imageUrl) {
    return (
      <Box className={classes['image-uploader']}>
        <div onClick={chooseImage} className={classes['image-uploader__frame']}>
          Click to upload an image
        </div>
        <input type='file' ref={inputFileRef} onChange={uploadImage}/>
      </Box>
    );
  }

  return (
    <Box className={classes['image-uploader']}>
      <div onClick={chooseImage} className={classes['image-uploader__frame']}>
        <img src={imageUrl} alt="" className={classes['image-uploader__image']}/>
      </div>
      <input type='file' ref={inputFileRef} onChange={uploadImage}/>
    </Box>
  );
}
