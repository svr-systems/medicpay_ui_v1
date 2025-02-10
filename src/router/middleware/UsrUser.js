import store from "@/store";

export default function UsrUser(next = null) {
  let auth = store.getters.getAuth;
  const condition = auth && auth.user.role_id == 3 ? true : false;

  if (!next) {
    return condition;
  }

  return condition ? next() : next({ name: "unauthorized" });
}
