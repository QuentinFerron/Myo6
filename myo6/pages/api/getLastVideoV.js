// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



export default function handler(req, res) {
  
  if (req.method === 'GET') {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json"); 


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };     
 

    fetch("http://141.145.200.146:5000/api/video/last_video/video_traitement.mp4", requestOptions)
      .then(response => response.json())
      .then(result => res.status(200).json(result))
      .catch(error => console.log('error', error));
    
  }

}
