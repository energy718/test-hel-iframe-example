<!-- eslint-disable no-useless-escape -->
<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<iframe
			ref="elFrame"
			class="simulator-content-frame"
			name="previewWindow"
			width="50%"
			height="50%"
		/>
	</div>
</template>

<script>
import { addThirdPartyDependencies } from './addDependencies';
export default {
	name: 'HelloWorld',
	props: {
		msg: String,
	},
	mounted() {
		const iframe = this.$refs['elFrame'];
		const win = iframe.contentWindow;
		const doc = iframe.contentDocument;
		win['PLUGIN_DATA'] = [
			{
				installThirdPartyDependencies: async function (Vue) {
					// 如果插件使用了第三方库，需要在此处进行安装
					// 动态依赖使用此函数安装
					await addThirdPartyDependencies.call(this, Vue);

					// 静态依赖使用原生的 Vue.use() 安装
					// Vue.use(第三方库)
				},
			},
		];
		doc.open();

		doc.write(/*html*/ `
    <!DOCTYPE html>
<html class="engine-design-mode">
	<head>
		<meta charset="utf-8" />
	</head>

	<body class="preview">
		<div id="app">画布加载中。。。</div>
		<!-- 渲染层 -->
		<script src="https://unpkg.com/vue@2.6.14/dist/vue.js"><\/script>
		<script type="module">
			function initialize() {
				window.vue = new Vue({
					el: '#app',
					render: (h) =>
						h(
							'div',
							{
								attrs: {
									id: 'demo',
								},
								//给div绑定样式
								style: {
									color: '#ff0000',
									height: '600px',
									width: '300px',
								},
							},
							'Hello Vue!'
						),
				});
			}
			for (const plugin of Array.from(window['PLUGIN_DATA'] || [])) {
				await plugin.installThirdPartyDependencies.call(window, Vue);
			}
			initialize();
		<\/script>
	</body>
</html>

    `);
		doc.close();
	},
};
</script>
