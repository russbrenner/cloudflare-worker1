// redirect
const destinationURL = "https://developers.cloudflare.com/workers/about/"
const statusCode = 301

async function handleRequest(request) {
  // check for cookie value cf-noredir
    let cookie = request.headers.get('Cookie') || ""
        if(cookie.includes("cf-noredir=true")) {
          console.log("matched cookie")
          return fetch(request)
        }
    // On User Agent
   const userAgent = request.headers.get("User-Agent") || ""
   if (userAgent.includes("curl")) {
     console.log("matched user-agent")
    return Response.redirect(destinationURL, statusCode)
  }

  // else
  console.log("no match")
  return fetch(request)
}

addEventListener("fetch", async event => {
  event.respondWith(handleRequest(event.request))
})
