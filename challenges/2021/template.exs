Code.compile_file("./utils/utils.exs")

defmodule Challenge do
  @moduledoc false

  def input do
    Utils.load_input(__ENV__.file)
  end

  def first_result do
    input()
  end

  def second_result do
    input()
  end
end

IO.inspect(Challenge.first_result(), label: "Q1")
IO.inspect(Challenge.second_result(), label: "Q2")
