import React from 'react'

const ProjectInfoScreen = (props) => {
	const { id } = props

	return (
		<div>{JSON.stringify(id)}</div>
	)
}

export default React.memo(ProjectInfoScreen)
