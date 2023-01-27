const LoggedInHome = () => {
  return <div>LoggedInHome</div>
}

const NotLoggedInHome = () => {
  return <div>NotLoggedInHome</div>
}

export const Home = () => {
  const isLoggedIn = false
  return isLoggedIn ? <LoggedInHome /> : <NotLoggedInHome />
}
