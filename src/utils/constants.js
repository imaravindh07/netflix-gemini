export const LOGO=
    "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
export const USER_AVATAR=
    "https://tse1.mm.bing.net/th?id=OIP.u3aU45q2Pcum--knQuaiSwHaHa&pid=Api&P=0&h=180"

export const API_OPTIONS={
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+process.env.REACT_APP_TMDB_KEY
    }
  };

export const IMG_CDN_URL='https://image.tmdb.org/t/p/w500'
export const BG_URL='https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/IN-en-20250210-TRIFECTA-perspective_92338d5d-6ccd-4b1a-8536-eb2b0240a55e_small.jpg'
export const SUPPORTED_LANGUAGES=[
    {identifier:"en",name:"English"},
    {identifier:"telugu",name:"Telugu"},
    {identifier:"hindi",name:"Hindi"}
  ]
export const GEMINI_API_KEY=process.env.REACT_APP_GEMINI_API_KEY;