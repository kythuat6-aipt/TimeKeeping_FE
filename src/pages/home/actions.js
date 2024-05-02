import api from "utils/service/api"

export const actionTimeKeeping = (data) => {
  return api({
    method: "POST",
    url: "/create-keeping-time",
    data
  })
}

