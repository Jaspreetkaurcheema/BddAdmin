import React from 'react'
import { Button } from 'components/ui'
import { toggleAddCategoryDialog } from '../store/stateSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HiPlusCircle } from 'react-icons/hi'

const PanelHeader = () => {
    const dispatch = useDispatch()
  const navigate=useNavigate()
    const onAddCategory = () => {
        dispatch(toggleAddCategoryDialog(true))
    }
    const onArticleAdd = () => {
        navigate(
            // `/app/knowledge-base/edit-article?categoryLabel=${data.label}&categoryValue=${data.value}`
            `/app/knowledge-base/edit-article`
        )
    }

    return (
        <div className="flex items-center">
            <Button onClick={onArticleAdd}  variant="solid" size="sm" icon={<HiPlusCircle />} >
                Add page
            </Button>
        </div>
    )
}

export default PanelHeader
