import store from "@/store";

export default function UsrAdmin(next = null) {
  let auth = store.getters.getAuth;
  const condition = auth && auth.user.role_id == 2 ? true : false;

  if (!next) {
    return condition;
  }

  return condition ? next() : next({ name: "unauthorized" });
}
