require('mocha/mocha.css');
let jsonp = require('../../dist/jsonp');
let expect = require('expect.js');

let Promise = require('bluebird');

mocha.setup('bdd');

describe('Test jsonp request: ', function() {
    let url1 = '/jsonp';
    it(url1, function(done) {
        jsonp(url1)
            .then(function(res) {
                expect(res.name).to.be('JamesYin');
                expect(res.number).to.be('666');
                done();
            });
    });
    let url2 = '/jsonp?callback=load&number=1';
    it(url2, function(done) {
        jsonp(url2)
            .then(function(res) {
                expect(res.name).to.be('JamesYin');
                expect(res.number).to.be('1');
                done();
            });
    });
    let url3 = '/jsonp?number=2';
    it(url3, function(done) {
        jsonp(url3)
            .then(function(res) {
                expect(res.name).to.be('JamesYin');
                expect(res.number).to.be('2');
                done();
            });
    });
    let url4 = '/jsonp';
    let arg4 = {number: 4};
    it(url4 + ' and ' + JSON.stringify(arg4), function(done) {
        jsonp(url4, arg4)
            .then(function(res) {
                expect(res.name).to.be('JamesYin');
                expect(res.number).to.be('4');
                done();
            });
    });
    let url5 = '/jsonp';
    let arg5 = {number: 5};
    it('Timeout test', function(done) {
        Promise.resolve(jsonp(url5, arg5)).timeout(1)
            .then(function(res) {
                expect(res.name).to.be('JamesYin');
                expect(res.number).to.be('5');
            })
            .catch(Promise.TimeoutError, function() {
                done();
            });
    });
});
mocha.run();