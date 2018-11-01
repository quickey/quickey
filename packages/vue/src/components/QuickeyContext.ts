import Vue from "vue";
import { createQuickey, IQuickeyActionOptions } from "@quickey/core";
import { IQuickeyOptions } from "@quickey/core/lib/Quickey";

export default Vue.component<any, any, any, any>("quickey-context", {
	props: {
		type: {
			type: String,
			default: "div"
		},
		global: {
			type: Boolean,
			default: false
		},
		actions: {
			type: Array,
			default: []
		},
		title: {
			type: String
		},
		description: {
			type: String
		}
	},

	methods: {
		addAction(action: IQuickeyActionOptions) {
			this.quickey.addAction(action);
		},

		removeAction(actionId: string) {
			this.quickey.removeAction(actionId);
		}
	},

	mounted() {
		const options: IQuickeyOptions = {
			title: this.title,
			description: this.description,
			actions: this.actions
		};

		if (!this.global) {
			options.target = this.$refs.root;
		}

		this.quickey = createQuickey(options);
	},

	beforeDestroy() {
		this.quickey.destroy();
		this.quickey = null;
	},

	render(createElement) {
		const props: any = {
			ref: "root"
		};

		if (!this.global) {
			props.tabindex = 0;
		}

		return createElement(
			this.type,
			props,
			this.$slots.default
		);
	}
});