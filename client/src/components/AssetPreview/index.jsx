import React from 'react';
import { Link } from 'react-router-dom';

const AssetPreview = ({ defaultThumbnail, claimData: { name, claimId, fileExt, contentType, thumbnail, title } }) => {
  const embedUrl = `/${claimId}/${name}.${fileExt}`;
  const showUrl = `/${claimId}/${name}`;
  return (
    <Link to={showUrl} >
      {(() => {
        switch (contentType) {
          case 'image/jpeg':
          case 'image/jpg':
          case 'image/png':
          case 'image/gif':
            return (
              <div>
                <h6 class='list-title'>{title}</h6>
                <img
                  className={'asset-preview-image'}
                  src={embedUrl}
                  alt={name}
                />
              </div>
            );
          case 'video/mp4':
            return (
              <div>
                <h6 class='list-title'>{title}</h6>
                <img
                  className={'asset-preview-video'}
                  src={thumbnail || defaultThumbnail}
                  alt={name}
                />
              </div>
            );
          default:
            return (
              <p>unsupported file type</p>
            );
        }
      })()}
    </Link>
  );
};

export default AssetPreview;
