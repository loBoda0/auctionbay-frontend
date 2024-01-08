import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export interface CreateBidFields {
  bid_amount: number
}

export const useCreateBid = () => {
  const CreateBidSchema = Yup.object().shape({
    bid_amount: Yup.number().required()
  })

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<CreateBidFields>({
    defaultValues: {
      bid_amount: 0,
    },
    mode: "onSubmit",
    resolver: yupResolver(CreateBidSchema)
  })

  return {
    handleSubmit,
    errors,
    control
  }
}