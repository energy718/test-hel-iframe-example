import { preFetchLib, bindVueRuntime } from 'hel-micro';
import { resetGlobalThis } from 'hel-micro-core';
export async function addThirdPartyDependencies(Vue) {
	resetGlobalThis(this);
	bindVueRuntime({ Vue });

	await preFetchLib('hel-tpl-remote-lib', {
		versionId: '2.1.2',
	});
}
