var vfs = require('vinyl-fs');

module.exports = function (gulp, plugins, config) {
    return function () {
        gulp.src('node_modules').pipe(plugins.symlink(config.src_path + '/components'));
    };
};
