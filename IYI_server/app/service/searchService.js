const Service = require('egg').Service;

class SearchService extends Service {
	//刘俊良  根据条件查找相应商品
	async showgood(kw, page, ways) {
		//查询相关商品
		console.log("进入service", "kw", kw, "页码", page, "方式", ways)
		let sql = "select * from goods"

		// 判断有没有关键字
		if (kw) {
			console.log("进入if")
			sql += " where name like ?"
			switch (ways) {
				case "id":
					sql += " order by id"
					break;
				case "desimg":
					sql += " order by desimg"
					break;
				case "sales":
					sql += " order by sales"
					break;
				case "price":
					sql += " order by price"
					break;
			}
			if (page) {
				sql += " limit ?,8"
				let curpage = (page-1) * 8;
				let res = await this.ctx.app.mysql.query(sql, ['%' + kw + '%', curpage])
				console.log(sql)
				console.log(res)
				return res;
			}
		} else {
			console.log("进入else")
			if (ways) {
				switch (ways) {
					case "id":
						sql += " order by id"
						break;
					case "desimg":
						sql += " order by desimg"
						break;
					case "sales":
						sql += " order by sales"
						break;
					case "price":
						sql += " order by price"
						break;
				}
				if (page) {
					sql += " limit ?,8"
					console.log(sql)
					let curpage = (page-1) * 8;
					let res = await this.ctx.app.mysql.query(sql, [curpage])
					console.log(res)
					return res;
				}
			}
		}

	}

	async advsale() {
		let sql = "select * from goods order by sales limit 1,2"
		let res = await this.ctx.app.mysql.query(sql, [])
		return res;
	}
}

module.exports = SearchService;
