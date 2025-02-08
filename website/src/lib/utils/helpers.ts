
export function handleSiginRedirect(
  url: any,
  message: string = "You must be logged in to access this page"
) {
  const redirectTo = url.pathname + url.search
  return `/signin?redirectTo=${redirectTo}&message=${message}`
}




