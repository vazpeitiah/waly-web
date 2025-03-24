import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useLocation, useNavigate } from 'react-router'
import { ROUTES } from '@/utils/const'
import {
  Category,
  createCategorySchema,
  defaultCategory,
} from '@/models/category'
import { useCreateCategory } from '@/queries/categories'

const CategoryForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { state } = useLocation()
  const category: Category | undefined = state?.category
  const form = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: category ?? defaultCategory,
  })
  const { createCategory, isPending: isCreating } = useCreateCategory()
  const isPending = isCreating

  const handleOnSubmit = form.handleSubmit((data) => {
    if (!category) {
      createCategory(data)
    }
    handleCancel()
  })

  const handleCancel = () => {
    form.reset()
    navigate(ROUTES.categories.root)
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">
        {category
          ? t('categories.form.editTitle', {
              category,
            })
          : t('categories.form.title')}
      </h1>
      <Form {...form}>
        <form onSubmit={handleOnSubmit} className={className} {...props}>
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('categories.form.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="w-full"
                type="button"
                disabled={isPending}
                onClick={handleCancel}
              >
                {t('buttons.cancel')}
              </Button>
              <Button type="submit" className="w-full" disabled={isPending}>
                {t('buttons.save')}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CategoryForm
