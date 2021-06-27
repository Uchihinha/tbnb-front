import { ElButton, ElForm, ElFormItem, ElInput, ElNotification, ElTable, ElTableColumn } from 'element-plus';

export default (app) => {
	app.use(ElButton);
	app.use(ElTable);
	app.use(ElTableColumn);
	app.use(ElInput);
	app.use(ElForm);
	app.use(ElFormItem);
	app.use(ElNotification);
};
