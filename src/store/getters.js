const getters = {
  signedIn: state => state.user.signedIn,
  user: state => state.user.user,
  loading: state => state.app.loading,
  markers: state => state.marker.markers
}
export default getters
