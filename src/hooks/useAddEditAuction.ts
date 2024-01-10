import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Auction } from '../interfaces/auction'

type Props = {
  defaultValues?: Auction
}

export interface CreateAuctionFields {
  id?: string 
  title: string
  description: string
  starting_price: number
  end_date: string
  image?: string
}

export const useAddEditAuction = ({defaultValues}: Props) => {
  const CreateAuctionSchema = Yup.object().shape({
    image: Yup.string(),
    title: Yup.string().required(),
    description: Yup.string().required(),
    starting_price: Yup.number().required().min(1),
    end_date: Yup.string().required().test('is-future-date', 'End date must be in the future', function (value) {
      const currentDate = new Date();
      const selectedDate = new Date(value);

      return selectedDate > currentDate;
    }),
  })
  
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      end_date: '',
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