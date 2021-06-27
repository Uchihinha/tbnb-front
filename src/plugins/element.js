import { ElButton, ElCol, ElDialog, ElForm, ElFormItem, ElInput, ElNotification, ElPagination, ElRow, ElTable, ElTableColumn } from 'element-plus';

export default (app) => {
	app.use(ElButton);
	app.use(ElTable);
	app.use(ElTableColumn);
	app.use(ElInput);
	app.use(ElForm);
	app.use(ElFormItem);
	app.use(ElNotification);
	app.use(ElRow);
	app.use(ElCol);
	app.use(ElDialog);
	app.use(ElPagination);
};
