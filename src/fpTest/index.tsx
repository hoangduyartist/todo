import { useState } from 'react';

const inputStyle = {
	padding: 10,
	width: '300px'
}
const spacing = {
	width: '100%',
	height: 26
}

const FPTest = () => {
	const [apiBE, setApiKeyBE] = useState('qQVvgx3FbtMUNryGjb0p');
	const [cId, setCid] = useState('');
	const [printer, setPrinter] = useState({});

	const onSubmit = () => {
		fetch(`https://ap.api.fpjs.io/visitors/${cId}?api_key=${apiBE}`)
			.then(res => res.json())
			.then(jsonRes => {
				console.log('verify_res', jsonRes)
				setPrinter(jsonRes)
			})
			.catch(error => {
				console.log('verify_err', error)
				setPrinter(error)
			})
	}

  return (
		<div>
			<p>Check verify Finger Print function</p>
			<div style={spacing}></div>
			<input placeholder="FP BE api" value={apiBE} onChange={e => setApiKeyBE(e.target.value)} style={inputStyle}/>
			<div style={spacing}></div>
			<input placeholder="client ID" value={cId} onChange={e => setCid(e.target.value)} style={inputStyle}/>
			<div style={spacing}></div>
			<button style={{ padding: 10 }} onClick={onSubmit}>submit</button>
			<div style={spacing}></div>
			<div style={spacing}></div>
			<div style={{ color: 'white' }}>{JSON.stringify(printer, null, 2)}</div>
		</div>
	)
}

export default FPTest