var should = require('should');

var OrderBook = require('../..');
describe('Orderbook', function () {
  var market;

  beforeEach(function () {
    market = new OrderBook();
  });

  describe('#setBid', function () {
    it('should allow limit buy orders to be made', function () {
      market.setBid(100, 0.30);
      market.bid[0].should.equal(0.3);
      market.bid[1].should.equal(100);
      should.not.exist(market.bid.bid);
    });


    it('should overwrite bids', function () {
      market.setBid(100, 0.30);
      market.setBid(40, 0.30);
      market.bid[1].should.equal(40);
    });

    it('should place the highest bids at the top', function () {
      market.setBid(100, 0.30);
      market.setBid(100, 0.40);
      market.setBid(100, 0.30);
      market.bid[0].should.equal(0.4);
    });

  });

  describe('#setAsk', function () {
    it('should allow limit sell orders to be made', function () {
      market.setAsk(100, 0.30);
      market.ask[0].should.equal(0.3);
      market.ask[1].should.equal(100);
      should.not.exist(market.ask.ask);
    });

    it('should overwrite asks', function () {
      market.setAsk(100, 0.30);
      market.setAsk(40, 0.30);
      market.ask[1].should.equal(40);
    });

    it('should place the lowest asks at the top', function () {
      market.setAsk(100, 0.30);
      market.setAsk(100, 0.20);
      market.setAsk(100, 0.30);
      market.ask[0].should.equal(0.2);
    });
  });

  describe('#buy', function () {
    it('should throw an error if the book is empty', function () {
      market.buy.bind(null, 30).should.throw('Insufficient supply!');
    });

    it('should allow market buy orders to be made', function () {
      market.setAsk(100, 0.30);

      market.buy(10);
      market.ask[0].should.equal(0.3);
      market.ask[1].should.equal(90);
    });

    it('should cross multiple asks', function () {
      market.setAsk(100, 0.30);
      market.setAsk(50, 0.32);
      market.buy(120);
      market.ask[0].should.equal(0.32);
      market.ask[1].should.equal(150 - 120);
    });
  });

  describe('#sell', function () {
    it('should throw an error if there are no sellers', function () {
      market.sell.bind(null, 30).should.throw('Insufficient demand!');
    });

    it('should reduce the amount on the top bid', function () {
      market.setBid(100, 0.30);

      market.sell(10);
      market.bid[0].should.equal(0.3);
      market.bid[1].should.equal(90);

    });

    it('should cross multiple bids', function () {
      market.setBid(100, 0.30);
      market.setBid(50, 0.32);
      market.sell(120);
      market.bid[0].should.equal(0.30);
      market.bid[1].should.equal(150 - 120);
    });
  });
});