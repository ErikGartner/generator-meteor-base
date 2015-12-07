'use strict';
var util = require('util');
var path = require('path');
var mkdirp = require('mkdirp');
var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname
    }, function (answers) {
      done();
    }.bind(this));
  },

  welcome: function welcome() {
    if (!this.options['skip-welcome-message']) {
      this.log(yosay());
    }
  },

  writing: function() {
    mkdirp('.gulp');
    this.copy('gulp/gitignore', '.gulp/.gitignore');
    this._writeTmpl('gulp/gulpfile.js', '.gulp/gulpfile.js');
    this._writeTmpl('gulp/package.json', '.gulp/package.json');

    mkdirp('.meteor');
    this.copy('meteor/gitignore', '.meteor/.gitignore');
    this.copy('meteor/packages', '.meteor/packages');
    this.copy('meteor/release', '.meteor/release');

    mkdirp('client/compatibility');
    mkdirp('client/styles');
    mkdirp('client/lib');
    mkdirp('client/templates/common');
    this._writeTmpl('client/templates/home.html', 'client/templates/home.html');
    this.copy('client/helpers.coffee', 'client/helpers.coffee');
    this.copy('client/subscriptions.coffee', 'client/subscriptions.coffee');

    mkdirp('lib');
    this.copy('lib/collections.coffee', 'lib/collections.coffee');
    this.copy('lib/methods.coffee', 'lib/methods.coffee');
    this.copy('lib/routes.coffee', 'lib/routes.coffee');

    mkdirp('server/lib');
    this.copy('server/bootstrap.coffee', 'server/bootstrap.coffee');
    this.copy('server/publications.coffee', 'server/publications.coffee');

    mkdirp('public/fonts');
    mkdirp('public/images');
    mkdirp('private');

    mkdirp('.profile.d');
    this.copy('profile.d/setup_env.sh', '.profile.d/setup_env.sh');

    this.copy('env', '.env');
    this.copy('gitignore', '.gitignore');
    this.copy('editorconfig', '.editorconfig');
    this.copy('CHANGELOG.md', 'CHANGELOG.md');

    this._writeTmpl('README.md', 'README.md');
    this._writeTmpl('CONTRIBUTING.md', 'CONTRIBUTING.md');
    this._writeTmpl('settings.json', 'settings.json');

  },

  install: function() {

  },

  _writeTmpl: function (src, dest) {

    var context = {
      name: this.appname
    };

    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      context
    );
  }

});
