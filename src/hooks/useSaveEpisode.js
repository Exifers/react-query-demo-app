import React from 'react'
import axios from 'axios'

export default function useSaveEpisode() {
  const [state, setState] = React.useReducer((_, action) => action, {
    isIdle: true,
  })

  const mutate = React.useCallback(async (values) => {
    setState({ isLoading: true })
    try {
      const data = await axios
        .patch(`/api/episodes/${values.id}`, values)
        .then((res) => res.data)
      setState({ isSuccess: true, data })
    } catch (error) {
      setState({ isError: true, error })
    }
  }, [])

  return [mutate, state]
}