import store from "@/store";

export default function UsrSystem(next = null) {
  let auth = store.getters.getAuth;
  const condition =
    auth &&
    (auth.user.role_id == 1 || auth.user.role_id == 2 || auth.user.role_id == 3)
      ? true
      : false;

  if (!next) {
    return condition;
  }

  return condition ? next() : next({ name: "unauthorized" });
}
