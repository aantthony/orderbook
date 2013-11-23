module.exports = OrderBook;

function OrderBook() {
  this.bid = null;
  this.ask = null;
}

OrderBook.prototype.buy = function (amount) {
  var need = amount;
  while (need > 0) {
    if (!this.ask) throw new Error('Insufficient supply!');
    if (this.ask[1] > need) {
      this.ask[1] -= need;
      return;
    }
    need -= this.ask[1];
    this.ask = this.ask.ask;
  }
};

OrderBook.prototype.sell = function (amount) {
  var have = amount;
  while (have > 0) {
    if (!this.bid) throw new Error('Insufficient demand!');
    if (this.bid[1] > have) {
      this.bid[1] -= have;
      return;
    }
    have -= this.bid[1];
    this.bid = this.bid.bid;
  }
};

OrderBook.prototype.setBid = function (amount, price) {
  var prev = this;
  var bid = this.bid;
  while (1) {
    if (!bid) {
      prev.bid = [price, amount];
      return;
    }
    if(bid[0] === price) {
      bid[1] = amount;
      return;
    }
    if (bid[0] < price) {
      var n = [price, amount];
      n.bid = bid;
      prev.bid = n;
      return;
    }
    prev = bid;
    bid = bid.bid;
  }
};

OrderBook.prototype.setAsk = function (amount, price) {
  var prev = this;
  var ask = this.ask;
  while (1) {
    if (!ask) {
      prev.ask = [price, amount];
      return;
    }
    if(ask[0] === price) {
      ask[1] = amount;
      return;
    }
    if (ask[0] > price) {
      var n = [price, amount];
      n.ask = ask;
      prev.ask = n;
      return;
    }
    prev = ask;
    ask = ask.ask;
  }
};
