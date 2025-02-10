import store from "@/store";

export default function Login(next = null) {
  const condition = store.state.auth ? true : false;

  if (!next) {
    return condition;
  }

  return condition ? next({ name: "home" }) : next();
}
