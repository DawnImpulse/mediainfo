/**
 * @info fetch media info using mediainfo wrapper library
 * @info also note that mediainfo must be in OS PATH
 */

import {exec as mediainfoExec} from 'mediainfo-parser';

/**
 * @param url - public url to the media file (url can be signed/expiry set)
 * @return Promise<object>
 * @public
 */
export default async function (url: string): Promise<object> {
    return new Promise((resolve, reject) => {
        try{
            // get media info from url
            mediainfoExec(url, (err, obj) => {
                // if there is error then reject with error
                if (err) reject(err.toString())
                else {
                    // in case of invalid url mediainfoexec return obj with empty media key
                    // hence we need to check that
                    // also we are checking other obj things as well
                    if (obj && obj.media && obj.media!== '')
                        // return obj
                        resolve(obj)
                        // reject error
                    else reject("some unknown error but mostly it is related to invalid url; check url again")
                }
            })
        }catch (err){
            // reject error
            reject(err.toString())
        }
    })
}
