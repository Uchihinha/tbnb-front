import { ElButton, ElCol, ElDialog, ElForm, ElFormItem, ElInput, ElInputNumber, ElMessageBox, ElNotification, ElPagination, ElRow, ElTable, ElTableColumn, ElTimeline, ElTimelineItem } from 'element-plus';

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
	app.use(ElTimeline);
	app.use(ElTimelineItem);
	app.use(ElMessageBox);
	app.use(ElInputNumber);
};
