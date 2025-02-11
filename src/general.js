export const APP_VERSION = "1.25.0210";
export const APP_NAME = "MEDICPAY";

const URL = "http://127.0.0.1:8000";
export const URL_API = URL + "/api";

export const getHdrs = (token = null, form_data = false) => {
  let headers = {
    "X-Requested-With": "XMLHttpRequest",
  };

  if (form_data) {
    headers["Content-Type"] = "multipart/form-data";
  } else {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  return { headers };
};

export const getRsp = (rsp) => {
  return rsp.data;
};

export const getErr = (obj) => {
  const err = {
    msg: obj.response.data.msg,
    err: obj.response.data.data,
  };

  console.log(err.err);

  return err.msg;
};

export const getDateTime = (sprDate = "-", sprBwn = " ", sprTime = ":") => {
  let dt = new Date();

  return (
    dt.getFullYear().toString().padStart(4, "0") +
    sprDate +
    (dt.getMonth() + 1).toString().padStart(2, "0") +
    sprDate +
    dt.getDate().toString().padStart(2, "0") +
    sprBwn +
    dt.getHours().toString().padStart(2, "0") +
    sprTime +
    dt.getMinutes().toString().padStart(2, "0") +
    sprTime +
    dt.getSeconds().toString().padStart(2, "0")
  );
};

export const getRules = () => {
  return {
    rqd: [(v) => !!v || "Campo requerido."],
    txt_rqd: [
      (v) => !!v || "Campo requerido.",
      (v) => (v && v.trim().length >= 2) || "Mínimo 2 caracteres.",
    ],
    txt: [
      (v) => {
        if (v) return (v && v.length >= 2) || "Mínimo 2 caracteres.";
        else return true;
      },
    ],
    email_rqd: [
      (v) => !!v || "Campo requerido.",
      (v) => (v && v.length <= 65) || "Máximo 65 caracteres.",
      (v) => /.+@.+\..+/.test(v) || "Formato invalido.",
    ],
    email: [
      (v) => {
        if (v) return (v && v.length <= 65) || "Máximo 65 caracteres.";
        else return true;
      },
      (v) => {
        if (v) return /.+@.+\..+/.test(v) || "Formato invalido.";
        else return true;
      },
    ],
    password_rqd: [
      (v) => !!v || "Campo requerido.",
      (v) => (v && v.length >= 8) || "Mínimo 8 caracteres.",
      (v) => (v && v.length <= 15) || "Máximo 15 caracteres.",
      (v) => /(?=.*[A-Z])/.test(v) || "Al menos una mayúscula.",
      (v) => /(?=.*[a-z])/.test(v) || "Al menos una minúscula.",
      (v) => /(?=.*\d)/.test(v) || "Al menos un número.",
      (v) =>
        /([!@$%*])/.test(v) || "Al menos un caractere especial (! @ $ % *).",
    ],
    doc_rqd: [
      (v) => !!v || "Campo requerido.",
      (v) => (v && v.size <= 1048576) || "El tamaño máximo de carga es de 1MB",
    ],
    doc: [
      (v) => {
        if (v)
          return (
            (v && v.size <= 1048576) || "El tamaño máximo de carga es de 1MB"
          );
        else return true;
      },
    ],
    img_rqd: [
      (v) => !!v || "Campo requerido.",
      (v) => (v && v.size <= 2097152) || "El tamaño máximo de carga es de 2MB",
    ],
    img: [
      (v) => {
        if (v)
          return (
            (v && v.size <= 2097152) || "El tamaño máximo de carga es de 2MB"
          );
        else return true;
      },
    ],
    fiscal_code_rqd: [
      (v) => !!v || "Campo requerido.",
      (v) => (v && v.length <= 13) || "Máximo 13 caracteres.",
      (v) => /^[A-Za-zñÑ&]{3,4}\d{6}\w{3}$/.test(v) || "Formato invalido.",
    ],
    fiscal_code: [
      (v) => {
        if (v) return (v && v.length <= 13) || "Máximo 13 caracteres.";
        else return true;
      },
      (v) => {
        if (v)
          return /^[A-Za-zñÑ&]{3,4}\d{6}\w{3}$/.test(v) || "Formato invalido.";
        else return true;
      },
    ],
  };
};

export const getObj = (data, store = false) => {
  let obj = Object.assign({}, data);

  if (!store) {
    obj["_method"] = "PATCH";
  }

  return obj;
};

export const getPropDocs = (obj, prop, subprop) => {
  obj[prop].forEach(function (item, i) {
    obj[prop + "_" + subprop + "_" + i] = item[subprop];
  });

  return obj;
};

export const getPropDoc = (obj, prop, subprop) => {
  obj[prop + "_" + subprop] = obj[prop][subprop];
  return obj;
};

export const getFormData = (data) => {
  let form_data = new FormData();

  Object.keys(data).forEach((key) => {
    if (
      !(data[key] instanceof File) &&
      typeof data[key] == "object" &&
      data[key] != null
    ) {
      form_data.append(key, JSON.stringify(data[key]));
    } else {
      form_data.append(
        key,
        data[key] == null ||
          (typeof data[key] == "string" && data[key].trim() == "")
          ? ""
          : data[key]
      );
    }
  });

  return form_data;
};

export const getBlob = (b64, ext) => {
  const binary_string = window.atob(b64.replace(/\s/g, ""));
  const len = binary_string.length;
  let bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }

  return new Blob([bytes.buffer], {
    type: "application/" + ext,
  });
};

export const getAmountFormat = (v) => {
  return Number(
    parseFloat(v == null || v == "" ? 0 : v).toFixed(2)
  ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
