import api from "utils/service/api"

export const actionTimeKeeping = (data) => {
  return api({
    method: "POST",
    url: "/timekeepings",
    data
  })
}

export const actionGetHistories = async () => {
  return api({
    method: "get",
    url: "/time-keepings/get-history",
  })
}
