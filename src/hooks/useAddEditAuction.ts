import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Auction } from '../interfaces/auction'

type Props = {
  defaultValues?: Auction
}

export const useAddEditAuction = ({defaultValues}: Props) => {
  const CreateAuctionSchema = Yup.object().shape({
    image: Yup.string(),
    title: Yup.string().required(),
    description: Yup.string().required(),
    starting_price: Yup.number().required(),
    end_date: Yup.date().required(),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      ...defaultValues
    },
    mode: 'onSubmit',
    resolver: yupResolver(CreateAuctionSchema),
  })

  return {
    handleSubmit,
    errors,
    control
  }
}