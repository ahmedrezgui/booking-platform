import { React, useEffect, useRef } from "react";
import { Image } from "cloudinary-react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { TbPhotoPlus } from "react-icons/tb";
import { Cloudinary } from "@cloudinary/url-gen/index";


function ImageUpload({ value, onChange }) {



    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        const cld = new Cloudinary({
            cloud: {
                cloudName: 'dqhtfmhmc'
            }
            });
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dqhtfmhmc',
            uploadPreset: 'uw_test'
        }, (error, result) => {
            if (!error && result && result.event === "success") {

                const myImage = cld.image(result.info.public_id);
                myImage.resize(fill().width(600).height(290).gravity(autoGravity()));
                const myURL = myImage.toURL();
                onChange(myURL);
            }
        }
        );

    }, [onChange])


    return (
        <div
            onClick={() => widgetRef.current.open()}
            className="relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-600">
            <TbPhotoPlus size={50} />
            <div className="text-lg font-semibold">Click to Upload</div>
            {value && (
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        alt="upload"
                        src={value}
                    />
                </div>
            )}

        </div>
    );
};

export default ImageUpload;
