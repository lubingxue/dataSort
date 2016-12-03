// 引入gulp
var gulp = require("gulp");

// 引入合并插件
var concat = require("gulp-concat");

// 引入压缩插件
var uglify = require("gulp-uglify");

// 启动服务
var webserver = require("gulp-webserver");

// 引入sass编译
var sass = require("gulp-sass");

// 引入gulp-webpack
var webpack = require("gulp-webpack");

// 引入named
var named = require("vinyl-named");

// 引入minify
var minify = require("gulp-minify-css");

// 引入版本控制插件
var rev = require("gulp-rev");

// 引入自动替换文件名
var revCollecotr = require("gulp-rev-collector");

// 引入url
var url = require("url");

// 引入fs 
var fs = require("fs");
/*//拷贝
gulp.task("copy-index",function(){
	gulp.src("./index.html")
		.pipe(gulp.dest("./app"));
})*/
//合并
/*gulp.task("concat",function(){
	gulp.src(["./app/src/scripts/lib/script1.js","./app/src/scripts/lib/script2.js"])
		.pipe(concat("script.js"))
		.pipe(gulp.dest("./app/src/scripts"));
})
*/
//压缩js
gulp.task("uglify",function(){
	gulp.src("./app/src/scripts/lib/jquery1.7.js")
		.pipe(uglify())
		.pipe(gulp.dest("./dist/jq"));
})
//启服务
gulp.task("webserver",function(){
	gulp.src("./")
		.pipe(webserver({
			port:80,
	    	livereload:true, // 页面保存浏览器自动刷新
	    	directoryListing:{   // 目录结构的配置
	    		enable:true,     // 显示目录
	    		path:"./"     // 显示具体路径下的目录
	    	},
			// mock数据
            middleware:function(req,res,next){
                var urlObj = url.parse(req.url,true);
                switch(urlObj.pathname){
                	case '/api/getLivelist.php':
                	res.setHeader("Content-type","application/json");
                	fs.readFile('./mock/livelist.json','utf-8',function(err,data){
                        res.end(data);
                	});
                	return;
                	case '/api/getLivelistmore.php':
                	res.setHeader("Content-type","application/json");
                	fs.readFile('./mock/livelist-more.json','utf-8',function(err,data){
                        res.end(data);
                	});
                    return;
                }
                next();
            }
		}));
})
var sassFiles = ["./app/src/styles/**/*.scss"];
var cssFiles = ["./app/src/styles/*.css"];
var jsFiles = ["./app/src/scripts/app.js"];
//编译sass
gulp.task("sass",function(){
	gulp.src(sassFiles)
		.pipe(sass())
		.pipe(minify())
		.pipe(gulp.dest("./app/prd/styles"));
})
gulp.task("css",function(){
	gulp.src(cssFiles)
		.pipe(minify())
		.pipe(gulp.dest("./app/prd/styles"));
})
//js的模块化
gulp.task("packjs",function(){
    gulp.src(jsFiles)
        .pipe(named())
        .pipe(webpack({
        	output:{
        		filename:'[name].js'
        	},
        	modules:{
        		loaders:[
	        		{
	        			test:/\.js$/,
	              		loader:'imports?define=>false'
	        		}
        		]  	
        	}
        }))
        .pipe(uglify().on("error",function(e){
            console.log("\x07",e.lineNumber,e.message);
            return this.end();
        }))
        .pipe(gulp.dest("./app/prd/scripts"));
})
//版本控制
var cssDistFiles = ["./app/prd/styles/app.css"];
var jsDistFiles = ["./app/prd/scripts/app.js"];
gulp.task("ver",function(){
    gulp.src(cssDistFiles)
        .pipe(rev())   // 生成name-md5文件
        .pipe(gulp.dest("./app/prd/styles"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./app/ver/styles"))
    gulp.src(jsDistFiles)
        .pipe(rev())   // 生成name-md5文件
        .pipe(gulp.dest("./app/prd/scripts"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./app/ver/scripts"))
})
gulp.task("html",function(){
	gulp.src(["./app/ver/**/*.json","./app/*.html"])
		.pipe(revCollector())
		.pipe(gulp.dest("./app"));
})
gulp.task("min",["ver","html"]);
//监测
gulp.task("watch",function(){
	//gulp.watch("./app/index.html",["copy-index"]);
	gulp.watch(sassFiles,["sass"]);
	gulp.watch(cssFiles,["css"]);
	gulp.watch("./app/src/scripts/**/*.js",["packjs"]);

})

gulp.task("default",["watch","webserver"]);